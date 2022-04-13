export const styles = {
  ghostButton: {
    color: 'custom.green.900',
    fontWeight: '700',
    isFullWidth: true,
    my: 2,
    outline: 'none !important',
    p: 0,
    variant: 'ghost',
    _hover: {
      bgColor: 'transparent',
      color: 'custom.green.800',
    },
    _focus: {
      outline: 0,
    },
  },
  modalContent: {
    bgColor: 'brand.1100',
    w: ['90%', '100%'],
  },
  modalDescription: {
    color: 'brand.600',
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.2475,
    lineHeight: 4,
    mb: 4,
    opacity: 0.64,
  },
  modalHeader: {
    color: 'brand.600',
    fontSize: [20, 24],
    fontWeight: '700',
    lineHeight: 8,
  },
}
