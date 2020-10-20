const FONTFAMILY = {
  medium: 'Poppins-Medium',
  regular: 'Poppins-Regular',
  bold: 'Poppins-SemiBold',
  extraBold: 'Poppins-Bold',
};

const FONTSIZES = {
  inputLabel: 14,
  btnLabel: 15,
};

const FONTSTYLES = {
  h1: {
    fontFamily: FONTFAMILY.base,
    fontSize: FONTSIZES.h1,
  },
  h2: {
    fontWeight: 'bold',
    fontSize: FONTSIZES.h2,
  },
  h3: {
    fontFamily: FONTFAMILY.emphasis,
    fontSize: FONTSIZES.h3,
  },
  h4: {
    fontFamily: FONTFAMILY.base,
    fontSize: FONTSIZES.h4,
  },
  h5: {
    fontFamily: FONTFAMILY.base,
    fontSize: FONTSIZES.h5,
  },
  h6: {
    fontFamily: FONTFAMILY.emphasis,
    fontSize: FONTSIZES.h6,
  },
  normal: {
    fontFamily: FONTFAMILY.base,
    fontSize: FONTSIZES.regular,
  },
  description: {
    fontFamily: FONTFAMILY.base,
    fontSize: FONTSIZES.medium,
  },
};

export {FONTFAMILY, FONTSIZES, FONTSTYLES};
