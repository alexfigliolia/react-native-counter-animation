import type { NodeList } from "./types";

export class Controller {
  public static looseEqual(int: number, raw: string) {
    // @ts-ignore
    return int == raw;
  }

  public static setup(value: string | number) {
    const tokens = this.captureGroups(`${value}`);
    const nodeList: NodeList[] = [];
    for (const res of tokens) {
      if (res === null || res === undefined) {
        continue;
      }
      if (!this.isDigit(res)) {
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

  private static captureGroups(value: string) {
    const groups: string[] = [];
    const { length } = value;
    let left = 0;
    while (left < length) {
      const leftChar = value[left];
      if (!this.isDigit(leftChar)) {
        groups.push(leftChar);
        left++;
        continue;
      }
      const stack: string[] = [leftChar];
      let right = left + 1;
      while (this.isDigit(value[right])) {
        stack.push(value[right]);
        right++;
      }
      groups.push(stack.join(""));
      left = right;
    }
    console.log(groups);
    return groups;
  }

  private static isDigit(val: string) {
    // @ts-ignore
    return parseInt(val) == val;
  }
}
