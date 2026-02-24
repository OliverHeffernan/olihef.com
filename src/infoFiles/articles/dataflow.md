DataFlow is a spreadsheet application built around Vim-style keyboard commands. As a Vim user, I was surprised to find that no spreadsheet tool offered the same efficient, keyboard-first workflow that makes text editing so fast. DataFlow brings modal editing, motion commands, and macros to spreadsheet manipulation.

## Core Philosophy

The project stems from a simple observation: if you're comfortable with Vim motions, why should you need to reach for the mouse every time you open a spreadsheet? DataFlow eliminates that friction by treating spreadsheet navigation and editing as a text manipulation problem.

I built it initially as a personal productivity tool—tracking my weekly budget and running mileage throughout the year. One spreadsheet included formulas that automatically calculated how many kilometers I needed each week to hit my annual goal of 1,000km. The ability to quickly navigate, copy formulas with relative references, and manipulate data without touching the mouse made these tasks significantly faster.

## How It Works

DataFlow operates in multiple modes familiar to Vim users:

**Normal Mode** provides navigation using `hjkl` motions (with quantifiers like `5k` to move up 5 rows), cell selection with `g{ref}` (e.g., `gA3`), and commands like `gg`/`G` to jump to the first or last row.

**Visual Mode** (`v`) enables rectangular selections for bulk operations—delete ranges with `d`, or yank formulas (`yf`) or values (`ys`) from multiple cells at once.

**Insert Mode** (`i`/`a`) allows editing within the formula bar, with Vim-style cursor movement (`H`/`L`), word jumping (`w`/`b`/`e`), and cursor positioning (`^`/`$`).

The application supports **macro recording** (`q`) and playback (`@`), enabling complex repeated operations to be automated. This was one of the features I'm most proud of—bringing Vim's macro power to spreadsheet workflows.

## Formula System

DataFlow integrates the Math.js library for standard mathematical functions (trigonometry, rounding, etc.), but also implements custom spreadsheet functions like `SUM`, `AVG`, `COUNT`, and their conditional variants (`SUMIF`, `AVGIF`, `COUNTIF`).

The most unique feature is the **relative cell reference** syntax. Instead of just absolute references like `A5`, you can use bracket notation to reference cells relative to the current position:

```
= [-3]{+5}
```

This references the cell 3 columns left and 5 rows down from the current position. The syntax becomes powerful when creating reusable formulas:

```
= SUM([]0:[]{-1})
```

This formula sums from row 0 to the previous row in the current column, automatically adjusting as you insert more data—no manual range updates needed.

## Technical Implementation

DataFlow is built using Tauri, Vue.js, and JavaScript. The Tauri framework provides native desktop capabilities—file dialogs, filesystem access—while keeping the application lightweight. Rust handles the backend for file I/O operations, while the core spreadsheet logic lives in the JavaScript frontend.

Implementing the formula evaluation system was essentially building a small programming language. I developed a parser to handle the custom syntax (relative references, function calls, operators), implemented syntax highlighting in the formula bar, and ensured formulas recalculate correctly when dependencies change.

The command parsing system was another significant challenge. Supporting the wide range of Vim motions—quantified movements, text objects, operators, visual selections, paste variants—required carefully structuring the command state machine. There are still many Vim features I haven't implemented, but the core workflow is solid.

## Development Approach

I developed DataFlow over several months in 2024, learning extensively throughout the process. Each feature—whether the relative reference system, macro recording, or the modal editing implementation—presented unique challenges that pushed my understanding of state management, parsing, and UI design.

The project is in active personal use and serves as both a productivity tool and a demonstration of what's possible when you rethink traditional spreadsheet interaction patterns through a keyboard-first lens.
