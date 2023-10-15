const
  xt = String.raw`xt(?:\.\d+)?=urn:(?:bt(?:ih:(?:[a-z2-7]{32}|[a-f\d]{40})|mh:[a-f\d]{64})|(?:md5|ed2k):[a-f\d]{32}|aich:[a-z2-7]{32}|kzhash:[a-f\d]{72}|bitprint:[a-z2-7]{32}\.[a-z2-7]{39}|tree:tiger:[a-z2-7]{39}|sha1:(?:[a-z2-7]{32}|[a-f\d]{40}))`,
  notxt = String.raw`(?!xt(?:\.\d+)?=)[-\w.!~*'()%+]+=[-\w.!~*'()%+]+`;

export const
  linkRegex = RegExp(
    String.raw`^(?:magnet:\?(?:${notxt}&)*${xt}(?:&(?:${xt}|${notxt}))*&?|https?://(?:w{3}\.)?[a-z\d]+(?:[-.][a-z\d]+)*\.[a-z]{2,8}(?::\d{1,5})?\S*)$`,
    `i`
  ),
  slugRegex = /^[a-z\d](?:-?[a-z\d])*$/;
