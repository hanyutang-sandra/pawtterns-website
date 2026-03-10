# Pawtterns — Design Specification
**Version:** 1.0 · **Target:** iOS 17+ · **Frame:** iPhone 16 (393 × 852 pt)

---

## Design Language

### Personality
Trusted companion, not clinical tool. The app icon says it all: a friendly illustrated dog paired with a clean analytics chart on a royal-blue-and-white canvas. Every screen should feel like **calm confidence** — the clarity of a fintech app (Monzo) meets the warmth of a pet-care brand.

**Three pillars:**
- **Clear** — every number and label scannable in under 2 seconds
- **Warm** — rounded forms, soft icon circles, friendly empty states
- **Focused** — no decoration for decoration's sake

### Reference Material
- `Assets.xcassets/AppIcon.appiconset/Pawtterns.png` — royal blue + white, line-art dog, sparkle stars, analytics chart
- `Assets.xcassets/splash.imageset/` — deep blue gradient, wave shapes, same dog + chart
- `.claude/product/reference/Screenshot 2026-03-03 at 7.43.07 PM.png` — Monzo iOS app: card-based layout, white cards on off-white page, branded accent, activity rows with icon circles, clean bottom tab bar

### SwiftUI Implementation Notes
- Use `NavigationStack` (iOS 16+) throughout — no UINavigationController for new screens
- Use `List` with `.insetGrouped` style for all data lists
- Use `@FetchRequest` for Core Data where possible
- Use semantic system colors (`Color(.systemGroupedBackground)`) for dark mode compatibility
- Override with brand tokens only where system colors are insufficient
- Minimum touch target: 44 × 44 pt everywhere

---

## 1. Design Tokens

### 1.1 Colors

| Token | Hex | iOS Semantic | Usage |
|---|---|---|---|
| `brand-green` | `#7FB069` | — | Primary CTA, active states, icons, tints (sage green) |
| `brand-green-tint` | `#E8F4E3` | — | Active chip bg, selected state fills |
| `page-bg` | `#F5F5F0` | — | App background (natural off-white) |
| `card-bg` | `#FAFAF7` | — | All card/section backgrounds |
| `label-primary` | `#3D5A4C` | — | Primary text, headers (forest green) |
| `label-secondary` | adaptive | `Color(.secondaryLabel)` | Subtitles, metadata |
| `label-tertiary` | adaptive | `Color(.tertiaryLabel)` | Placeholder, disabled |
| `separator` | adaptive | `Color(.separator)` | Row dividers |
| `toast-navy` | `#0D1B3E` | — | Toast bar background |
| `exposure-green` | `#7FB069` | — | Exposure event icons (sage green) |
| `exposure-green-tint` | `#E8F4E3` | — | Exposure icon circle bg, Food badge bg |
| `symptom-terracotta` | `#E07A5F` | — | Symptom event icons (terracotta) |
| `symptom-terracotta-tint` | `#F7E3DD` | — | Symptom icon circle bg, Medication badge bg |
| `lift-high` | `#E07A5F` | — | Lift ≥ 2.0 text + border (terracotta) |
| `lift-high-tint` | `#F7E3DD` | — | Lift ≥ 2.0 pill background |
| `lift-mid` | `#C97B4B` | — | Lift ≥ 1.5 text + border (earthy amber-brown) |
| `lift-mid-tint` | `#F5E8D8` | — | Lift ≥ 1.5 pill background |
| `lift-low` | `#C8A45A` | — | Lift > 1.0 text + border (warm amber) |
| `lift-low-tint` | `#F5F0DC` | — | Lift > 1.0 pill background |
| `lift-neutral` | `#8A9E94` | — | Lift ≤ 1.0 (muted sage-gray) |
| `lift-neutral-tint` | `#E8EDE9` | — | Lift ≤ 1.0 pill background |
| `destructive` | `#E07A5F` | — | Delete actions (terracotta) |

**AccentColor asset:** `#7FB069` — set in `Assets.xcassets/AccentColor.colorset`

### 1.2 Typography (SF Pro — system font)

| Style | Size | Weight | Usage |
|---|---|---|---|
| `nav-title` | 17pt | Semibold | Navigation bar titles |
| `large-title` | 34pt | Bold | Large nav title (root screens) |
| `section-header` | 15pt | Semibold | Card/section labels |
| `body` | 17pt | Regular | Row primary text |
| `body-medium` | 17pt | Medium | Emphasized row text, button labels |
| `callout` | 16pt | Regular | Stat values, secondary content |
| `caption` | 13pt | Regular | Subtitles, metadata |
| `caption-medium` | 13pt | Medium | Badge text, active filter labels |
| `caption2` | 11pt | Regular | Timestamps |
| `caption2-semibold` | 11pt | Semibold | Count chips |

### 1.3 Spacing & Sizing

| Token | Value | Usage |
|---|---|---|
| `space-4` | 4pt | Tight gaps inside badges |
| `space-8` | 8pt | Between adjacent elements |
| `space-12` | 12pt | Row internal vertical padding |
| `space-16` | 16pt | Screen margins, card padding |
| `space-24` | 24pt | Between major sections |
| `radius-card` | 16pt | All section cards |
| `radius-inner` | 10pt | Search field, inner containers |
| `radius-badge` | capsule | All pills, chips, kind badges |
| `icon-circle-sm` | 32 × 32pt | Activity row icon circles |
| `icon-circle-md` | 44 × 44pt | Pet thumbnail in list |
| `icon-circle-lg` | 100 × 100pt | Pet detail hero photo |

### 1.4 Shadows

| Token | Value | Usage |
|---|---|---|
| `shadow-card` | `0 2 8 rgba(0,0,0,0.06)` | Standard card |
| `shadow-raised` | `0 4 20 rgba(0,0,0,0.10)` | Toast, modals |

---

## 2. Component Library

### C-01 · Section Card
```
Background:    Color(.secondarySystemGroupedBackground)
Corner radius: 16pt
Shadow:        shadow-card
```
Internal structure: VStack(spacing: 0). Header row has 16pt H padding + 12pt V padding. Rows handle their own vertical padding. Dividers between rows are full-width (no inset).

---

### C-02 · Activity Row
```
HStack(spacing: 12) {
    icon-circle-sm     // 32×32pt
    VStack(leading) {
        Text(title)    // body
        Text(subtitle) // caption, label-secondary
    }
    Spacer()
    Text(timestamp)    // caption2, label-secondary
}
.padding(.vertical, 12)
.padding(.horizontal, 16)
```
**Icon circle:** 50% corner radius.
- Exposure: `exposure-green-tint` fill, `rectangle.stack` SF Symbol at 13pt in `exposure-green`
- Symptom: `symptom-terracotta-tint` fill, `waveform` SF Symbol at 13pt in `symptom-terracotta`

---

### C-03 · Kind Badge
```
Text("Food" | "Medication")
    .font(.caption.weight(.medium))
    .padding(.horizontal, 8).padding(.vertical, 3)
    .background(Capsule().fill(tintColor))
    .foregroundStyle(coreColor)
```
- Food: `exposure-green-tint` bg + `exposure-green` text
- Medication: `symptom-terracotta-tint` bg + `symptom-terracotta` text

---

### C-04 · Lift Badge
```
Text("Lift 1.6×")
    .font(.caption.weight(.medium))
    .padding(.horizontal, 8).padding(.vertical, 4)
    .background(Capsule().fill(tintColor))
    .foregroundStyle(coreColor)
```
Color selection by value:
- ≥ 2.0 → `lift-high` / `lift-high-tint`
- ≥ 1.5 → `lift-mid` / `lift-mid-tint`
- > 1.0 → `lift-low` / `lift-low-tint`
- ≤ 1.0 → `lift-neutral` / `lift-neutral-tint`

---

### C-05 · Filter Chip
```
HStack(spacing: 4) {
    Text(label)         // caption-medium
    Image("chevron.down") // 10pt, semibold
}
.padding(.horizontal, 12).padding(.vertical, 6)
.background(Capsule().fill(bgColor))
.foregroundStyle(fgColor)
```
- Default: `Color(.systemGray5)` bg + `Color(.label)` text
- Active (non-default value set): `brand-green-tint` bg + `brand-green` text

---

### C-06 · Time Button
```
HStack(spacing: 4) {
    Image(systemName: "clock") // 12pt
    Text(timeLabel)            // caption-medium
}
.padding(.horizontal, 8).padding(.vertical, 4)
.background(Capsule().fill(Color.accentColor.opacity(0.10)))
.foregroundStyle(Color.accentColor)
```

---

### C-07 · Primary Action Button
```
Text("Log symptoms")
    .font(.body.weight(.medium))
    .frame(maxWidth: .infinity)
    .padding(.vertical, 14)
    .background(RoundedRectangle(cornerRadius: 12).fill(activeColor))
    .foregroundStyle(.white)
```
- Active: `Color.accentColor` fill
- Disabled: `Color(.systemGray4)` fill + `Color(.systemGray)` text

---

### C-08 · Toast Bar
```
HStack {
    Text(message)         // subheadline, white
    Spacer()
    Button("Undo") { }   // subheadline.weight(.semibold), white
}
.padding(.horizontal, 16).padding(.vertical, 14)
.background(RoundedRectangle(cornerRadius: 12).fill(Color(red:0.05,green:0.11,blue:0.24)))
.shadow(color: .black.opacity(0.2), radius: 12, x: 0, y: 4)
```
Position: floating, above tab bar, 16pt margin on all sides.
Animation: `.move(edge: .bottom).combined(with: .opacity)`, 0.25s ease-in-out.
Auto-dismiss: 3 seconds.

---

### C-09 · Search Field
```
HStack(spacing: 8) {
    Image(systemName: "magnifyingglass")  // secondary
    TextField("Search or add food / medication...", text: $text)
    if !text.isEmpty {
        Button { text = "" } label: {
            Image(systemName: "xmark.circle.fill") // secondary
        }
    }
}
.padding(11)
.background(RoundedRectangle(cornerRadius: 10).fill(Color(.systemGray6)))
```

---

### C-10 · Checkbox Row
```
Button { toggle() } label: {
    HStack(spacing: 12) {
        Image(systemName: checked ? "checkmark.square.fill" : "square")
            .font(.title3)
            .foregroundStyle(checked ? Color.accentColor : Color(.tertiaryLabel))
        Text(label)
            .foregroundStyle(Color(.label))
        Spacer()
    }
    .padding(.vertical, 12).padding(.horizontal, 16)
    .contentShape(Rectangle())
}
.buttonStyle(.plain)
```

---

### C-11 · Pet Photo Circle
```
// With photo:
Image(uiImage: photo)
    .resizable().scaledToFill()
    .frame(width: size, height: size)
    .clipShape(Circle())

// Without photo:
Circle()
    .fill(Color.accentColor.opacity(0.08))
    .frame(width: size, height: size)
    .overlay(
        Image(systemName: "pawprint.circle.fill")
            .resizable().scaledToFit()
            .padding(size * 0.2)
            .foregroundStyle(Color.accentColor)
    )
```

---

### C-12 · Insight Summary Row
```
HStack(spacing: 12) {
    VStack(alignment: .leading, spacing: 3) {
        Text(itemName)       // body.weight(.medium)
        Text(summaryText)    // caption, label-secondary
    }
    Spacer()
    LiftBadge(lift: lift)    // C-04
}
.padding(.vertical, 12).padding(.horizontal, 16)
```

---

### C-13 · Insight Symptom Group Header
```
HStack(spacing: 10) {
    Image(systemName: expanded ? "chevron.down" : "chevron.right")
        .font(.caption.weight(.semibold))
        .foregroundStyle(expanded ? Color.accentColor : Color(.secondaryLabel))
        .frame(width: 16)
    Text(symptomType.displayName)
        .font(.headline)
    Spacer()
    Text("\(count)")
        .font(.caption2.weight(.semibold))
        .foregroundStyle(Color.accentColor)
        .padding(.horizontal, 8).padding(.vertical, 4)
        .background(Capsule().fill(Color.accentColor.opacity(0.10)))
}
.padding(.vertical, 12).padding(.horizontal, 16)
.contentShape(Rectangle())
```

---

### C-14 · Empty State
```
VStack(spacing: 16) {
    Image(systemName: iconName)
        .font(.system(size: 48))
        .foregroundStyle(Color.accentColor.opacity(0.35))
    Text(title)
        .font(.title3.weight(.semibold))
    Text(body)
        .font(.subheadline)
        .foregroundStyle(.secondary)
        .multilineTextAlignment(.center)
}
.padding(32)
.frame(maxWidth: .infinity, maxHeight: .infinity)
```

---

### C-15 · "View All" Row
```
HStack(spacing: 6) {
    Spacer()
    Text("View Full Activity")
        .font(.subheadline.weight(.medium))
        .foregroundStyle(Color.accentColor)
    Image(systemName: "chevron.right")
        .font(.caption.weight(.semibold))
        .foregroundStyle(Color.accentColor)
    Spacer()
}
.padding(.vertical, 12)
.contentShape(Rectangle())
```

---

## 3. Screen Specifications

### 3.1 Tab Bar (global)

```
Icons:     plus.circle.fill  |  pawprint.fill  |  folder.fill
Labels:    Log               |  Pets           |  More
Selected:  accent color fill + accent label
Unselected: Color(.systemGray2)
Background: Color(.systemBackground) with top separator
Height:    83pt (includes home indicator)
```

UIKit setup in SceneDelegate:
```swift
UITabBar.appearance().tintColor = UIColor(red: 127/255, green: 176/255, blue: 105/255, alpha: 1)
UITabBar.appearance().unselectedItemTintColor = .systemGray2
```

---

### Screen 1 · Log Tab

**Navigation:** No back button (root). Nav title "Log", inline display mode.

**Structure:**
```
StatusBar
NavBar: "Log"
─────────────────────────────────────
Tabman pet strip (pinned, 48pt)
  [Biscuit ●] [Luna] [Oliver]
  2pt underline indicator, accent color
─────────────────────────────────────
ScrollView (vertical)
  VStack(spacing: 16), padding 16pt H, 12pt top, 100pt bottom

  ┌── EXPOSURE CARD (C-01) ──────────┐
  │ Header: "Exposure"    [◷ Now]    │  ← C-06 time button
  ├──────────────────────────────────┤
  │ Search field (C-09)              │
  │                                  │
  │ ── [when text entered] ─────── ─│
  │ C-02 row: Chicken    [Food]      │  ← C-02 + C-03
  │ ─────────────────────────────── │
  │ C-02 row: Royal Canin [Med]      │
  │ ─────────────────────────────── │
  │ [+] Add "salmon"                 │  ← accent color, body
  └──────────────────────────────────┘

  ┌── SYMPTOMS CARD (C-01) ──────────┐
  │ Header: "Symptoms"    [◷ Now]    │  ← C-06
  ├──────────────────────────────────┤
  │ C-10: ☐ Vomit                    │
  │ ─────────────────────────────── │
  │ C-10: ☑ Loose stool              │
  │ ─────────────────────────────── │
  │ C-10: ☐ Skipped meal             │
  │                                  │
  │ [    Log symptoms    ]           │  ← C-07, 16pt H margin
  └──────────────────────────────────┘

Toast (floating): C-08
─────────────────────────────────────
TabBar
```

**Empty state (no pets):**
C-14: icon=`pawprint.fill`, title="No pets yet", body="Add a pet in the Pets tab to start logging."

**Tabman strip:**
- Background: `Color(.systemBackground)`, bottom shadow
- Selected tab: accent color text + 2pt underline
- Unselected: `Color(.secondaryLabel)` text

---

### Screen 2 · Pets List

**Navigation:** `NavigationStack`. Title "Pets", `.navigationBarTitleDisplayMode(.large)`.
Right bar item: `+` button, accent color.

**Structure:**
```
List(.insetGrouped)
  ForEach(pets) { pet in
    NavigationLink(destination: PetDetailView(pet:)) {
      HStack(spacing: 12) {
        C-11 photo (44×44pt)
        VStack(leading, spacing: 3) {
          Text(name)   // body.weight(.semibold)
          Text(breed)  // caption, secondaryLabel (hidden if nil)
        }
        Spacer()
        VStack(trailing, spacing: 2) {
          Text("\(activeDays) active days")   // caption2, secondaryLabel
          Text("\(symptomDays) symptom days") // caption2, secondaryLabel
        }
      }
      .padding(.vertical, 10)
    }
  }
  .onDelete { deletePet() }
Row height: 64pt minimum
```

**Empty state:** C-14: icon=`pawprint.fill`, title="No pets here yet", body="Tap + to add your first pet."

---

### Screen 3 · Pet Detail

**Navigation:** Pushed from Pets List. Title = pet name, `.inline`.
Right bar item: "Edit" button → pushes PetEditView.

**Structure:**
```
ScrollView
  VStack(spacing: 0)

  ── Hero Header (not a card) ─────────
  C-11 photo (100×100pt), centered
  Padding: 24pt top, 24pt bottom
  ─────────────────────────────────────

  List-style sections inside ScrollView:

  ┌── PROFILE CARD (C-01) ─────────────┐
  │ "Profile"                           │  ← section-header
  ├─────────────────────────────────────┤
  │ Name                      Biscuit   │  ← LabeledRow
  │ Breed              Golden Retriever │
  │ Sex                            Male │
  │ Date of birth          Jan 5, 2022  │
  └─────────────────────────────────────┘

  ┌── STATS CARD (C-01) ───────────────┐
  │ "Stats (60 days)"                   │
  ├─────────────────────────────────────┤
  │ Active days                      12 │  ← value in accent color
  │ Exposure events                  48 │
  │ Symptom days                      3 │
  └─────────────────────────────────────┘

  ┌── INSIGHTS CARD (C-01) ────────────┐
  │ "Insights (last 60 days)"           │
  │ "Based on your logs. Not medical…"  │  ← caption, tertiaryLabel
  ├─────────────────────────────────────┤
  │
  │  STATE A — No Data:
  │  C-14: icon=chart.bar, "No data yet"
  │  + "Go to Log →" accent link
  │
  │  STATE B — Threshold not met:
  │  C-14: icon=chart.bar, "No strong patterns yet"
  │  body: "Log same item ≥3 times…"
  │
  │  STATE C — Insights:
  │  C-13 accordion header (per SymptomType)
  │    └── C-12 summary rows (when expanded)
  │          └── Detail panel (when row tapped)
  │              ├── P(S|E): 62%
  │              ├── Exposure days (E): 8
  │              ├── Overlap days (ES): 5
  │              ├── Baseline P(S): 40%
  │              ├── Lift: 1.6×
  │              ├── "Last exposure: 2 days ago"
  │              └── "View related activity →"
  │
  └─────────────────────────────────────┘
  Footer: "Based on your logs. Not medical advice." caption, centered

  ┌── RECENT ACTIVITY CARD (C-01) ─────┐
  │ "Recent Activity"                   │
  ├─────────────────────────────────────┤
  │ C-02 row: Chicken    Today 2:14 PM  │
  │ C-02 row: Loose stool Today 8:30 AM │
  │ C-02 row: Royal Canin Yest. 6:10 PM │
  ├─────────────────────────────────────┤
  │ C-15: "View Full Activity ›"        │
  └─────────────────────────────────────┘
```

**LabeledRow pattern:**
```swift
HStack {
    Text(label)
        .foregroundStyle(.secondary)
    Spacer()
    Text(value)
}
.padding(.vertical, 12)
.padding(.horizontal, 16)
```
Stats values use `Color.accentColor` for the number.

---

### Screen 4 · Activity List

**Navigation:** Pushed from Pet Detail or insight CTA.
Title: "Activity", `.inline`.
Right items: `magnifyingglass` icon + "Select" text, both accent color.

**Structure:**
```
VStack(spacing: 0)

Filter bar (pinned, 52pt):
  Background: Color(.systemGroupedBackground)
  HStack: [C-05 day chip] [C-05 content chip]
  Padding: 16pt H, 8pt V, 8pt gap between chips

─────────────────────────────────────
List(.insetGrouped)
  ForEach(groupedByDate) { section in
    Section(header: dateHeader) {
      ForEach(items) {
        C-02 row
      }
    }
  }
  .onDelete
```

**Date section header:** Uppercase, `caption`, `secondaryLabel`. "TODAY", "YESTERDAY", "MON, MAR 2"

**Select mode:**
- Rows gain leading selection circles (`.editMode`)
- Bottom toolbar: `Delete (N)` in `symptom-terracotta` (#E07A5F) centered; enabled when ≥1 selected

**Search (inline, replaces nav bar):**
UISearchController style — C-09 appears below nav bar, filters list live.

**Empty states:**
- No items: C-14, icon=`tray`, "No activity on this date."
- No search results: "No results for "\(query)"."

---

### Screen 5 · Pet Edit / Add Pet

**Navigation:** Pushed (edit) or presented as modal sheet (add).
Title: "Add Pet" or "Edit Pet", `.inline`.
Left: "Cancel" (modal only). Right: "Save", disabled until name non-empty.

**Structure (SwiftUI Form):**
```
Form {
  Section {
    // Centered photo circle (C-11, 100pt) wrapped in PhotosPicker
    // listRowBackground(.clear)
  }

  Section("Details") {
    LabeledContent("Name") {
      TextField("Required", text: $name).multilineTextAlignment(.trailing)
    }
    LabeledContent("Breed") {
      TextField("Optional", text: $breed).multilineTextAlignment(.trailing)
    }
  }

  Section("Identity") {
    Picker("Sex", selection: $sex) { ... }
    DatePicker("Date of birth", selection: $dob, in: ...Date(), displayedComponents: .date)
  }
}
```

---

## 4. Navigation Map

```
Tab Bar
├── [Log]  UIHostingController(LogTabView)
│            └── TabmanPetSwitcher → LogView (per pet)
│
├── [Pets] UIHostingController(NavigationStack)
│            └── PetsListView
│                  ├── → PetDetailView (push)
│                  │       ├── → ActivityListView (push, unfiltered)
│                  │       ├── → ActivityListView (push, pre-filtered from insight CTA)
│                  │       └── → PetEditView (push)
│                  └── → PetEditView (modal sheet, add new)
│
└── [More] UINavigationController(SettingsViewController)
```

---

## 5. Interaction Patterns

### Accordion (Insights)
- Tap C-13 header → toggle `expandedSymptomTypes`
- Tap C-12 summary row → toggle `expandedInsightIds`
- Both animate with `.animation(.easeInOut(duration: 0.2))`

### Toast
- Appears on any log action (exposure or symptom)
- Slides up from bottom: `.transition(.move(edge: .bottom).combined(with: .opacity))`
- "Undo" reverses the Core Data write and dismisses immediately
- Auto-dismisses after 3s via `DispatchQueue.main.asyncAfter`

### Filter Chips
- `showsMenuAsPrimaryAction = true` (UIKit) or `.menuStyle(.button)` (SwiftUI)
- Active state: C-05 highlighted variant
- Day filter: Today / Yesterday / Specific date (date picker sheet) / All (last 60 days)
- Content filter: All / Exposures only / Symptoms only / Specific symptom / Item+Symptom (pre-applied)

### Swipe to Delete (Pets List)
- Standard `.onDelete` SwiftUI modifier
- Confirmation: `.alert` before deleting ("Delete [name]? This will permanently delete all their logs.")


### Bulk Delete (Activity List)
- Enter: tap "Select" → `.environment(\.editMode, .constant(.active))`
- Toolbar: "Delete (N)" button, `symptom-terracotta` (#E07A5F), enabled when selection non-empty
- Confirmation: `.alert` before deleting

---

## 6. Figma File Organization

When building in Figma, use this page structure:

```
📄 _Tokens      — Color variables, text styles, effect styles
📄 _Components  — C-01 through C-15 as published components with variants
📄 01 Log       — Empty state + active states (searching, with results)
📄 02 Pets      — Pets List + empty + Pet Detail (States A/B/C for insights)
📄 03 Activity  — Default + filtered + select mode + search + empty
📄 04 Edit      — Add Pet + Edit Pet
📄 Flows        — Connected prototype frames
```

### Component Variants to Define

| Component | Variants |
|---|---|
| `ActivityRow` | `type=[exposure, symptom]` |
| `KindBadge` | `type=[food, medication]` |
| `LiftBadge` | `level=[high, mid, low, neutral]` |
| `FilterChip` | `state=[default, active]` |
| `CheckboxRow` | `state=[checked, unchecked]` |
| `TimeButton` | `state=[now, custom]` |
| `PrimaryButton` | `state=[active, disabled]` |
| `InsightGroupHeader` | `expanded=[true, false]` |
| `InsightSummaryRow` | `expanded=[true, false]` |
| `PetPhotoCircle` | `size=[sm-44, lg-100], hasPhoto=[true, false]` |
| `EmptyState` | `screen=[log, pets, activity, search]` |

---

## 7. Key Design Decisions

| Decision | Rationale |
|---|---|
| `#7FB069` sage green accent | Nature-inspired primary color — warm, calm, and distinct from clinical blue |
| `#F5F5F0` natural off-white background | Earthy warmth over sterile gray — reinforces the nature-inspired personality |
| `#3D5A4C` forest green for primary text | Grounded, readable, on-brand — avoids harsh black on the warm background |
| Terracotta `#E07A5F` for symptoms + delete | Intuitive warning color in the earthy palette — consistent role across symptom events and destructive actions |
| Sage green `#7FB069` for exposure icons | Positive/neutral tone for food logging — calm and natural |
| Earthy gradient lift badges (terracotta → amber) | Severity still immediately legible without clashing reds/oranges of default palette |
| Fixed hex backgrounds (not adaptive system colors) | Nature palette requires specific warmth — system adaptive grays would undermine the earthy feel |
| Capsule for all chips and badges | Friendly, rounded, consistent with the app's warm personality |
| Brand-tinted photo placeholder | Warm, on-brand — avoids the cold gray of generic apps |
| Toast slides from bottom | Natural for one-handed use; Undo is in the thumb zone |
| SF Pro throughout (no custom fonts) | Native performance, Dynamic Type support, zero font loading |
| `NavigationStack` (not UINavigationController) | Classical SwiftUI — stack-based navigation with type-safe destinations |
