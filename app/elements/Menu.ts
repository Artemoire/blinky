import { Line } from "../../lib/elements/Line";
import { Stateful } from "../../lib/elements/Stateful";
import { Text } from "../../lib/elements/Text";
import { Fgr, Spacing } from "../../lib/elements/TextAttributes";

const MenuItem = (title: string, focused: boolean) => focused ? Fgr.Blue(Text(title)) : Text(title);

export const Menu = (initial = 0) => Stateful((state, updateState) => {

  setTimeout(() => updateState({ selected: (state.selected + 1) % 8 }), 500);

  return Line({
    parts: [
      Spacing(2, MenuItem('File', state.selected === 0)),
      Spacing(2, MenuItem('Edit', state.selected === 1)),
      Spacing(2, MenuItem('Selection', state.selected === 2)),
      Spacing(2, MenuItem('View', state.selected === 3)),
      Spacing(2, MenuItem('Go', state.selected === 4)),
      Spacing(2, MenuItem('Run', state.selected === 5)),
      Spacing(2, MenuItem('Terminal', state.selected === 6)),
      Spacing(2, MenuItem('Help', state.selected === 7)),
    ]
  })
}, { selected: initial });
