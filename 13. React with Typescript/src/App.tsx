import './App.css'
import TeaCard from './components/TeaCard';
import Counter from './components/Counter';
import TeaList from './components/TeaList';
import type { TEA } from './types';
import OrderForm from './components/OrderForm';
import Card from './components/Card';

const menu : TEA[] = [
  {id: 1, name: 'Masala', price: 25},
  {id: 2, name: 'Ginger', price: 50},
  {id: 3, name: 'Lemon', price: 35},
]

function App() {
  return (
    <div>
      <h1>Hello World!</h1>
      <TeaCard
        name={'Masala Tea'}
        price={20}
        isSpecial
      />
      <Counter/>
      <TeaList items={menu}/>

      <div>
        <OrderForm SubmitFuntion={(order) => {
          console.log('Placed : ' , order.name, order.cups)
        }}/>
      </div>


      <div>
        <Card
          title='TEAANDTEA'
          footer={<button>Order Now !</button>}
        />
      </div>
    </div>
  )
}
export default App
