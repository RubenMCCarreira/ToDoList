export const nextClassNames = (classnames: string[]) =>
  classnames
    .filter((it) => !!it)
    .map((it) => it?.trim())
    .join(' ');
