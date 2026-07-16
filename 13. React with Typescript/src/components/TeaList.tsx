import type { TEA } from '../types';
import TeaCard from './TeaCard';

interface TeaListProps {
    items: TEA[]
}

function TeaList({items}: TeaListProps) {
    return (
        <div>
            {
                items.map((tea) => (
                    <TeaCard 
                    key={tea.id}
                    name={tea.name}
                    price={tea.price}
                    isSpecial={tea.price > 30}
                    />
                    
                ))
            }
        </div>
    )
}

export default TeaList