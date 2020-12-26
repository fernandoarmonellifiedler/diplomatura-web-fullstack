function setBodyAttr(attr, value) {
    if (document.body) document.body[attr] = value;
    else throw new Error("no support");
  }