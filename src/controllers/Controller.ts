import Investiment from "../types/Investiment";

export default class Controller {

    static getAllInvestiments(): Investiment[] {
        let investiments = localStorage.getItem('investiments');
        
        if(investiments) {
            return JSON.parse(investiments);
        }
        return [];
    }

    static updateInvestiments(investiments: Investiment[]): void {
        localStorage.removeItem('investiments');
        localStorage.setItem('investiments', JSON.stringify(investiments));
    }

    static updateInvestiment(investiment: Investiment): void {
        let investiments = this.getAllInvestiments();

        investiments?.filter(inv => {
            if(inv.id === investiment.id) {
                inv.amount = investiment.amount;
                inv.favorite = investiment.favorite;
                inv.name = investiment.name;
                inv.purchaseDate = investiment.purchaseDate;
                inv.purchasePrice = investiment.purchasePrice;
                inv.ticker = investiment.ticker
            }
        });

        this.updateInvestiments(investiments);
    }

    static removeInvestiment(investiment: Investiment): void {

        let investiments = this.getAllInvestiments();
        investiments = investiments.filter(inv => inv.id !== investiment.id);
        this.updateInvestiments(investiments);
    }

    static saveInvestiment(investiment: Investiment): void {
        let investiments = this.getAllInvestiments();
        
        investiment.id = this.getNewInvestimentId();
        investiments.push(investiment);
        this.updateInvestiments(investiments);
    }

    static getNewInvestimentId(): number {
        const investiments: Investiment[] = this.getAllInvestiments();
        
        if(investiments.length > 0) {
            return ++investiments[investiments.length - 1].id;
        }
        return 0;
    }


    static changeNotifications(): void {
        localStorage.setItem('notify', JSON.stringify(!this.needToNotify()));
    }

    static needToNotify(): boolean {
        const notifyLS = localStorage.getItem('notify')

        if(!notifyLS){
            localStorage.setItem('notify', JSON.stringify(false))
            return false
        } else {
            return JSON.parse(notifyLS);
        }
    }

    static filterInvestiments(typeFilter: string) : void{
        switch (typeFilter){
            case 'name':
                this.updateInvestiments(
                    this.filterInvestimentsByName()
                );
                break;
            case 'price':
                this.updateInvestiments(
                    this.filterInvestimentsByPrice()
                );
                break;
            case 'favorite':
                this.updateInvestiments(
                    this.filterInvestimentsByFavorite()
                );
                break;
            default:
                throw new Error(
                    'This function only recives "name", "price" and "favorite" as a param'
                )
        }
    }

    static filterInvestimentsByName() : Array<Investiment>{
        const investiment = this.getAllInvestiments()
        
        return investiment.sort((a, b) => (a.ticker > b.ticker ? 1 : -1))
    }

    static filterInvestimentsByPrice() : Array<Investiment>{
        const investiment = this.getAllInvestiments()

        return investiment.sort((a, b) => b.amount - a.amount)
        
    }
    
    static filterInvestimentsByFavorite() : Array<Investiment>{
        const investiments = this.getAllInvestiments()
        const favoriteInvestments = investiments.filter((investiment) => investiment.favorite)
        const notFavoriteInvestments = investiments.filter((investiment) => !investiment.favorite)

        return favoriteInvestments.concat(notFavoriteInvestments)

    }


}