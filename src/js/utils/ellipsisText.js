const ellipsisText = (text, limitCount) =>
  text.length > limitCount ? `${text.slice(0, limitCount - 1)}...` : text;

export default ellipsisText;
