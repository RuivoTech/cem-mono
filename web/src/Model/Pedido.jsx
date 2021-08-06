import Item from "./Item";

class Pedido {
    constructor() {
        this.explicitType = "pedido";
        this.id = 0;
        this.name = "";
        this.status = "";
        this.contact = "";
        this.zipCode = "";
        this.address = "";
        this.number = "";
        this.complement = "";
        this.city = "";
        this.type = "";
        this.fkCampaign = "";
        this.timeDelivery = "";
        this.items = [Item];
    }
}

export default Pedido;