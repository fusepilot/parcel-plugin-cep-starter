interface JSON {
  stringify(obj: any, dunno?: any, indentation?: number): string;
  parse(str: string): any;
}

declare var JSON: JSON;
