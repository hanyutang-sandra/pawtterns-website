# Project Context

## Overview

This is an iOS application originally built as a pet health diary tracker called "Pawtterns". The project is being pivoted to a similar but different problem space with updated design and improved code architecture.

## Current State

**Pawtterns** is a comprehensive pet health diary application that helps pet owners track their pets' daily health metrics, activities, concerns, and notes. The app features:

- **Daily Diary Management**: Tabbed interface for managing daily pet health data with sections for ratings, metrics, activities, concerns, and notes
- **Health Tracking**: Rating system for eating/drinking, energy, mobility, and sleep with concern tracking for various health issues
- **Pet Management**: Pet profile creation, editing, multiple pet support, and archiving
- **Data Visualization**: Trend charts and summary views for health metrics
- **Diary Organization**: Collection view for organizing and viewing diary entries

## Architecture Overview

- **Framework**: UIKit (not SwiftUI)
- **Pattern**: MVVM-MVC Hybrid
- **Data**: Core Data for persistence
- **Navigation**: UITabBarController with 3 main tabs
- **Dependencies**: Tabman (tabbed interface), Charts (visualization)

## Project Structure

```
Pawtterns/
├── AppDelegate.swift / SceneDelegate.swift
├── ViewControllers/                 # Feature-based organization
│   ├── DailyDiaryViewController/    # Main diary with nested tabs
│   ├── DiaryBooksViewController/
│   ├── PetProfileViewController/
│   └── Settings/Archive views
├── Custom Views/                    # Reusable UI components
├── Models/                          # Core Data models
├── config/                          # Types, colors, helpers
└── Assets/Resources
```

## Key Features

1. **Multi-tab Daily Diary**: Activity, Concerns, Metrics, Notes sections
2. **Rating System**: Custom 5-point scales for various health indicators
3. **Concern Tracking**: Vomit, Diarrhea, Thirst, Breathing, Behavior, etc.
4. **Pet Profiles**: Multiple pet support with images and details
5. **Data Visualization**: Charts and trends for health metrics
6. **Archive System**: Archive inactive pets

## Technical Details

- **Language**: Swift 5.x
- **Deployment Target**: iOS (UIKit compatible)
- **Build System**: Xcode with Swift Package Manager
- **Permissions**: Photo Library, Camera access for pet images

## Future Direction

The project is undergoing:

- Problem space pivot (see Pivot Idea below)
- Design updates and UI modernization
- Architecture improvements (cleaner MVVM, service layer)
- Potential SwiftUI migration considerations

---

## Pivot Idea

### Pawtterns

**Analytical Pet Ownership — Digestion Insight MVP**

### Product Overview

#### Problem

Pet owners frequently experience digestion-related uncertainty:

- Intermittent vomiting
- Loose stool
- Skipped meals
- Reactions after food or medication changes

Owners attempt to identify triggers but fail because:

- Reactions may be delayed
- Memory is unreliable
- Multiple exposures overlap
- Patterns are not obvious over time

Veterinary visits rely on recall rather than structured evidence.

#### Product Goal

Provide a lightweight analytical tool that helps owners identify possible digestion triggers by correlating:

- Food exposure
- Medication exposure
- Digestion incidents

**The product is not medical advice and does not use AI.**
It performs deterministic pattern analysis on user-logged data.

#### Core Value Proposition

Help pet owners answer: **"What might be causing my pet's digestion issues?"**

### Product Principles

1. Minimal logging friction
2. Binary observable inputs
3. Explainable analysis
4. No AI or opaque models
5. Local, structured reasoning
6. Narrow scope (digestion only)

### Target User

**Primary users:**

- Pet owners managing digestion sensitivity
- Owners experimenting with food changes
- Owners tracking medication effects
- Analytically minded pet parents

**Not targeting:** general pet journaling or social usage.

### MVP Feature Scope

#### Included

- **Pet Profile**: Basic pet identity
- **Exposure Logging**: Record food or medication given
- **Symptom Logging**: Record digestion incidents using checkboxes
- **Analytical Insights**: Detect correlations between exposures and symptoms
- **Quick Search Entry**: Previously entered items searchable via string search

#### Explicitly Excluded (MVP)

- AI features
- Daily health ratings
- Reminders
- Vet integrations
- Social features
- Scheduling systems
- Nutrition scoring
- Recents caching
- Daily check-ins

### User Flows

#### Log Exposure

User selects:

- Food
- Medication

Input via:

- Search existing items
- Or type new name

System:

- Creates item if new
- Creates exposure event with timestamp

#### Log Symptom

Simple checkbox interaction:
**Any issues?**

- ☐ Vomit
- ☐ Loose stool
- ☐ Skipped meal

Each checked item creates a symptom event.

#### Insight Generation

System analyzes historical data and produces statements such as:

> "Chicken appeared in 8 logged days. Symptoms followed in 5 of those days."

### Data Model

#### Pet

```
Pet
- id
- name
- birthDate
- breed
- sex
- createdAt
- updatedAt
```

#### ExposureItem

Reusable searchable entries.

```
ExposureItem
- id
- kind            (food | medication)
- displayName
- searchKey       (normalized text)
- createdAt
- updatedAt
```

**Purpose:**

- Enables quick string search
- Prevents duplicate item definitions

#### ExposureEvent

Represents when something was given.

```
ExposureEvent
- id
- petId
- timestamp
- type            (food | medication)
- itemId
- createdAt
```

#### SymptomEvent

Represents digestion incidents.

```
SymptomEvent
- id
- petId
- timestamp
- type            (vomit | loose_stool | skipped_meal)
- createdAt
```

### Search Normalization

All searchable strings generate a `searchKey`.

**Normalization rules:**

- Lowercase
- Trim whitespace
- Collapse multiple spaces
- Remove punctuation

Used for prefix/contains search.

### Analytical Model (No AI)

#### Time Model

Data is analyzed per analysis day.

```
analysisDay = local date derived from timestamp
```

#### Definitions

- **Exposure Day**: A day with ≥1 ExposureEvent for an item
- **Symptom Day**: A day with ≥1 SymptomEvent
- **Active Day**: A day with any logged exposure or symptom

#### Counts (per item)

Across a rolling window (example: last 60 days):

```
E  = exposure days
S  = symptom days
ES = days with both exposure and symptoms
A  = active days
```

**Implicit negatives:**

```
EN = E - ES
```

(No daily check-in required.)

#### Metrics

**Conditional Symptom Rate:**

```
P(S|E) = ES / E
```

**Baseline Symptom Rate:**

```
P(S) = S / A
```

**Lift:**

```
Lift = P(S|E) / P(S)
```

#### Minimum Threshold

Insights shown only when:

```
E >= 3
```

Prevents weak signals.

#### Recency Weighting

Recent data weighted higher:

```
Age           Weight
0–7 days      1.0
8–21 days     0.7
22–60 days    0.4
```

Older data ignored.

### Insight Presentation Rules

Insights must be:

- Descriptive
- Probabilistic
- Non-medical

**Allowed example:**

> "Loose stool occurred after 5 of 8 days containing chicken."

**Not allowed:**

> "Chicken causes illness."

### System Architecture Notes

- Deterministic analytics only
- No machine learning
- All computations can run locally
- Schema supports future extensions without migration risk

### MVP Success Metrics

**Primary metric:**

- Logged days per user (7-day retention)

**Secondary:**

- Exposures logged per user
- Symptom logs per user
- First insight generated

### Future Compatibility (Design Intent)

Current structure allows later addition of:

- Ingredient-level analysis
- Reaction time windows
- Daily check-ins
- Severity levels
- Recents caching

No schema redesign required.

### Non-Goals

The product is **not**:

- A veterinary diagnostic tool
- A medical record system
- A social pet platform
- An AI assistant

It is a **pattern detection tool for digestion tracking**.

### Summary

The MVP consists of:

- Simple exposure logging
- Binary symptom logging
- Deterministic correlation analysis
- Explainable digestion insights

Scope is intentionally narrow to enable rapid solo development while delivering clear analytical value.
