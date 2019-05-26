const linkAttributes = (external?: boolean) => ({
  target: external ? '_blank' : undefined,
  rel: external ? 'noopener external nofollow' : undefined,
});

export default linkAttributes;
