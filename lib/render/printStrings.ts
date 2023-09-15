import { Element } from "../elements/Element";

const GOTO_LINE_ABOVE = '\x1b[A';
const GOTO_LINE_START = '\r';
const CLEAR_SCREEN = '\x1b[2J';

type LineHistory = {
  positions: [number, number][]
}

const printState = {
  lineCount: 0,
  caret: 0,
  // lines: [] as LineHistory[],
  // stdout: {
  //   cols: process.stdout.columns,
  //   rows: process.stdout.rows,
  // },
}

export const printStrings = (strings: string[]) => {
  process.stdout.write(GOTO_LINE_START);
  process.stdout.write(GOTO_LINE_ABOVE.repeat(printState.lineCount));
  const maxCaret = process.stdout.columns;
  printState.lineCount = 0;
  printState.caret = 0;

  for (let i = 0; i < strings.length; i++) {
    if (printState.caret === maxCaret) {
      printState.caret = 0;
      printState.lineCount++;
    }

    const renderString = strings[i];

    const isEscapeSequence = renderString['0'] === '\x1b';

    process.stdout.write(renderString);
    if (!isEscapeSequence) printState.caret += renderString.length;
    if (renderString === '\n') {
      printState.caret = 0;
      printState.lineCount++;
    }

  }
}