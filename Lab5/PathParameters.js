export default function PathParameters(app) {
  const add = (req, res) => {
    const { a, b } = req.params;
    const sum = parseInt(a, 10) + parseInt(b, 10);
    res.send(sum.toString());
  };
  const subtract = (req, res) => {
    const { a, b } = req.params;
    const sum = parseInt(a, 10) - parseInt(b, 10);
    res.send(sum.toString());
  };
  const multiply = (req, res) => {
    const { a, b } = req.params;
    const product = parseInt(a, 10) * parseInt(b, 10);
    res.send(product.toString());
  };
  const divide = (req, res) => {
    const { a, b } = req.params;
    const bNum = parseInt(b, 10);
    if (bNum === 0) {
      res.send("NaN");
      return;
    }
    const q = parseInt(a, 10) / bNum;
    res.send(q.toString());
  };
  app.get("/lab5/add/:a/:b", add);
  app.get("/lab5/subtract/:a/:b", subtract);
  app.get("/lab5/multiply/:a/:b", multiply);
  app.get("/lab5/divide/:a/:b", divide);
}
