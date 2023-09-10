import { Fgr, Spacing } from "./graphics/elements/TextAttributes";
import { Line } from "./graphics/elements/Line";
import { Text } from "./graphics/elements/Text";
import { Stateful } from "./graphics/elements/Stateful";
import { RenderApp } from "./graphics/render/AppRenderer";

const MenuItem = (title: string, focused: boolean) => focused ? Fgr.Red(Text(title)) : Text(title);

const Menu = () => Stateful((state, updateState) => {

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
}, { selected: 0 });

RenderApp(Menu());