import type { NodeList } from "./types";

export class Controller {
  private static PARSER = /(\D+)?(\d+)(\D+)?(\d+)?(\D+)?/;

  public static looseEqual(int: number, raw: string) {
    // @ts-ignore
    return int == raw;
  }

  public static setup(value: string | number) {
    const tokens = Controller.PARSER.exec(`${value}`) || [];
    tokens.shift();
    const nodeList: NodeList[] = [];
    for (const res of tokens) {
      if (res === null || res === undefined) {
        continue;
      }
      if (isNaN(parseInt(res))) {
        nodeList.push({ value: res, children: [res] });
      }
      for (let i = 0; i < res.length; i++) {
        const value = res[i];
        const int = parseInt(value);
        if (isNaN(int)) {
          continue;
        }
        const children = value
          ? new Array(int + 1)
              .join("0")
              .split("0")
              .map((_, i) => i)
          : [];
        nodeList.push({ value, children });
      }
    }
    return nodeList;
  }
}
