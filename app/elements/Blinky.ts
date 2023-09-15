import { Group } from "../../lib/elements/Group";
import { Line } from "../../lib/elements/Line";
import { Text } from "../../lib/elements/Text";
import { Bgr, Fgr, Spacing } from "../../lib/elements/TextAttributes";
import { Explorer } from "./Explorer";
import { Menu } from "./Menu";

const CommandLabel = (key: string, mnemonic: string) => Group(Text("  "), Bgr.Blue(Text(key)), Fgr.Blue(Text(mnemonic)))

export const Blinky = () => Group(
  Menu(),
  Explorer({
    cols: process.stdout.columns,
    rows: process.stdout.rows - 3,
  }),
  Text("$"),
  Text("\n"),
  Group(
    CommandLabel("F1 ", " HLP"),
    CommandLabel("F2 ", " MNU"),
    CommandLabel("F3 ", " VIW"),
    CommandLabel("F4 ", " EDT"),
    CommandLabel("F5 ", " CPY"),
    CommandLabel("F6 ", " MVE"),
    CommandLabel("F7 ", " MKD"),
    CommandLabel("F8 ", " DEL  "),
  )
);