import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { IBasket, IBasketItem, IBasketTotal } from '../shared/Models/Basket';
import { IProduct } from '../shared/Models/product';
import { Basket } from '../shared/Models/Basket';

@Injectable({
  providedIn: 'root',
})
export class BasketSercive {
  baseUrl: string = 'https://localhost:44349/api';

  constructor(private http: HttpClient) {}

  private basketSource = new BehaviorSubject<IBasket>(null);
  basket$ = this.basketSource.asObservable();
  private basketSourceTotal = new BehaviorSubject<IBasketTotal>(null);
  basketTotal$ = this.basketSourceTotal.asObservable();

  clacualteTotal(){
    const basket = this.GetCurrentValue();
    const shipping = 0;
    const subtotal = basket.basketItems.reduce((a, c) => {
      return (c.price * c.qunatity) + a;
    }, 0)
    const total = shipping + subtotal;
    this.basketSourceTotal.next({shipping, subtotal, total});
  }

  GetBasket(id: string) {
    return this.http.get(`${this.baseUrl}/Baskets/get-basket-item/${id}`).pipe(
      map((res: IBasket) => {
        this.basketSource.next(res);
        this.clacualteTotal();
        return res;
      }),
    );
  }

  SetBasket(basket: IBasket) {
    return this.http.post(`${this.baseUrl}/Baskets/update-basket`, basket).subscribe({
      next: (res: IBasket) => {
        this.basketSource.next(res);
        this.clacualteTotal();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  GetCurrentValue() {
    return this.basketSource.value;
  }

  AddItemToBasket(product: IProduct, quantity: number = 1) {
    const itemToAdd: IBasketItem = this.MapProductToBasketItem(product, quantity);
    let basket = this.GetCurrentValue();
    if(basket.id == null){
      basket = this.CreateBasket();
    }
    basket.basketItems = this.AddOrUpdate(basket.basketItems, itemToAdd, quantity);
    return this.SetBasket(basket);
  }
  private AddOrUpdate(
    basketItems: IBasketItem[],
    itemToAdd: IBasketItem,
    quantity: number,
  ): IBasketItem[] {
    const index = basketItems.findIndex((i) => i.id === itemToAdd.id);
    if (index == -1) {
      itemToAdd.qunatity = quantity;
      basketItems.push(itemToAdd);
    } else {
      basketItems[index].qunatity += quantity;
    }

    return basketItems;
  }
  private CreateBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basketId', basket.id);
    return basket;
  }
  private MapProductToBasketItem(product: IProduct, quantity: number): IBasketItem {
    return {
      id: product.id,
      category: product.categoryName,
      image: product.photo[0].imageName,
      name: product.name,
      price: product.newPrice,
      qunatity: quantity,
      description: product.description,
    };
  }

  incrementBasketItemQuantity(item: IBasketItem){
    const basket = this.GetCurrentValue();
    const itemIndex = basket.basketItems.findIndex(i => i.id === item.id);
    basket.basketItems[itemIndex].qunatity ++;
    this.SetBasket(basket);
  }

  decrementBasketItemQuantity(item: IBasketItem){
    const basket = this.GetCurrentValue();
    const itemIndex = basket.basketItems.findIndex(i => i.id === item.id);
    if (basket.basketItems[itemIndex].qunatity > 1) {
      basket.basketItems[itemIndex].qunatity --;
      this.SetBasket(basket);
    }else{
      this.removeItemFromBasket(item);
    }
  }
  removeItemFromBasket(item: IBasketItem) {
    const basket = this.GetCurrentValue();
    if(basket.basketItems.some(i => i.id === item.id)){
      basket.basketItems = basket.basketItems.filter(i => i.id !== item.id);
      if(basket.basketItems.length > 0){
        this.SetBasket(basket);
      }else{
        this.deleteBasketItem(basket);
      }
    }
  }
  deleteBasketItem(basket: IBasket) {
    return this.http.delete(`${this.baseUrl}/Basket/delete-basket-item/${basket.id}`)
    .subscribe({
      next: (res) => {
        this.basketSource.next(null);
        localStorage.removeItem("basketId");
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
