export default function QueryParameters(app) {
  const calculator = (req, res) => {
    const { a, b, operation } = req.query;
    let result = 0;
    const aNum = parseInt(a, 10);
    const bNum = parseInt(b, 10);
    switch (operation) {
      case "add":
        result = aNum + bNum;
        break;
      case "subtract":
        result = aNum - bNum;
        break;
      case "multiply":
        result = aNum * bNum;
        break;
      case "divide":
        result = bNum === 0 ? "Invalid operation" : aNum / bNum;
        break;
      default:
        result = "Invalid operation";
    }
    res.send(result.toString());
  };
  app.get("/lab5/calculator", calculator);
}
