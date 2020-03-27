const query = {};

module.exports = {
  useRouter: () => ({ query }),
  withRouter: component => {
    component.defaultProps = {
      ...component.defaultProps,
      router: { query },
    };
    return component;
  },
};
