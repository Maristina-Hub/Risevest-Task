import path from "path";


export const homeController = (req, res) => {
  return res.sendFile(path.join(`${__dirname}/../views/index.html`));
};

