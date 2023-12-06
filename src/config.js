export const maxWidthMobileIcons = '(max-width: 700px)';

export const Criteria = {
    maxWidthMobile: '800px',
    minWidthDesktop: '801px',
    descriptionType: 'Gain means that high values of a given alternative on this criterion will result in a higher position of the alternative in the final ranking. Cost means that low values of an alternative on this criterion will result in a higher position of the alternative in the final ranking.',
    descriptionLinearSegments: 'Choose how many linear segments the criterion should have. To select the general function, choose 0.',
};

export const Alternatives = {
    maxWidthMobile: '767px',
    minWidthDesktop: '768px',
};

export const Categories = {
    minWidthShowParent: '1150px',
    maxWidthMobile: '870px',
    minWidthDesktop: '871px'
}

export const Preferences = {
    maxWidthMobile: '500px',
    Comparisons: {
        maxWidthDropdownColumn: '550px',
        ReferenceRanking: {
            maxWidthMobile: '1200px',
            minWidthDesktop: '1201px'
        },
        PairwiseComparisons: {
            maxWidthMobile: '991px',
            minWidthDesktop: '992px',
            types: {
                preference: '>',
                weakPreference: '>=',
                indifference: '='
            }
        }
    },
    Intensities: {
        alternatives: [
            { number: 1, letter: 'A' },
            { number: 2, letter: 'B' },
            { number: 3, letter: 'C' },
            { number: 4, letter: 'D' },
        ],
        maxWidthMobile: '1380px',
        minWidthDesktop: '1381px',
        types: {
            preference: '>',
            weakPreference: '>=',
            indifference: '='
        }
    },
    BestWorst: {
        maxWidthMobile: '991px',
        minWidthDesktop: '992px'
    }
};

export const Results = {
    maxWidthMobile: '650px',
    Sampling : {
        maxWidthMobile: '620px'
    }
}
