
export interface Product{
    id: string
    pl: {
        label: string
        unit: string
        price: number
    }
    en: {
        label: string
        unit: string
        price: number
    }
}

const products: Product[] = [
    {
        id: 'pasta',
        en: {
            label: 'pasta',
            unit: 'pcs',
            price: 1.25
        },
        pl: {
            label: 'makaron',
            unit: 'szt',
            price: 4.95
        }
    },
    {
        id: 'butter',
        en: {
            label: 'butter',
            unit: 'pcs',
            price: .95
        },
        pl: {
            label: 'masło',
            unit: 'szt',
            price: 3.15
        }
    },
    {
        id: 'milk2',
        en: {
            label: 'milk 2% fat',
            unit: 'pcs',
            price: .90
        },
        pl: {
            label: 'mleko 2%',
            unit: 'szt',
            price: 2.20
        }
    },
    {
        id: 'milk3',
        en: {
            label: 'milk 3% fat',
            unit: 'pcs',
            price: .95
        },
        pl: {
            label: 'mleko 3%',
            unit: 'szt',
            price: 2.30
        }
    },
    {
        id: 'cheese',
        en: {
            label: 'cheese',
            unit: 'pcs',
            price: 1.40
        },
        pl: {
            label: 'ser żółty',
            unit: 'szt',
            price: 4.80
        }
    },
    {
        id: 'mayonnaise',
        en: {
            label: 'mayonnaise',
            unit: 'pcs',
            price: 1.55
        },
        pl: {
            label: 'majonez',
            unit: 'szt',
            price: 4.70
        }
    },
    {
        id: 'ketchup',
        en: {
            label: 'ketchup',
            unit: 'pcs',
            price: 1.65
        },
        pl: {
            label: 'ketchup',
            unit: 'szt',
            price: 5.10
        }
    },
    {
        id: 'eggs10',
        en: {
            label: '10 eggs',
            unit: 'pcs',
            price: 3.99
        },
        pl: {
            label: 'jajka 10 szt.',
            unit: 'szt',
            price: 8.99
        }
    },
    {
        id: 'wheat_bread',
        en: {
            label: 'wheat bread',
            unit: 'pcs',
            price: .89
        },
        pl: {
            label: 'chleb pszenny',
            unit: 'szt',
            price: 2.60
        }
    },
    {
        id: 'rice',
        en: {
            label: 'rice',
            unit: 'pcs',
            price: 1.25
        },
        pl: {
            label: 'ryż',
            unit: 'szt',
            price: 4.30
        }
    },
];

export default products
