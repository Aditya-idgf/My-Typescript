import type {PropsWithChildren, ReactNode} from 'react';

interface CardProps extends PropsWithChildren {
    title: string,
    footer: ReactNode
}

function Card({title, children, footer}: CardProps) {
    return (
        <div>
            <h2>{title}</h2>
            <div>
                {children}
            </div>
            {footer && <footer>{footer}</footer>}
        </div>
    )
}

export default Card