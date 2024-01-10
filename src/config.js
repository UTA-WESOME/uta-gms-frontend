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
    minWidthDesktop: '871px',
    CategoriesPanel: {
        minValueSamples: 0,
        defaultValueSamples: 100,
        maxValueSamples: 10000,
        descriptionSamples: 'Define how many samples will be used for this category when running calculations. To turn off the sampler, enter 0. Please remember that sampler does not take into account preferences defined as indifference.'
    }
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
    Extremes: {
        obDescription: "Best possible position with the assumption that variants with the same utility are ranked lower in the ranking",
        pbDescription: "Best possible position with the assumption that variants with the same utility are ranked higher in the ranking",
        owDescription: "Worst possible position with the assumption that variants with the same utility are ranked lower in the ranking",
        pwDescription: "Worst possible position with the assumption that variants with the same utility are ranked higher in the ranking"
    },
    Representative: {
        maxWidthMobile: '500px'
    },
    Sampling: {
        maxWidthMobile: '620px',
        darkModeColors: {
            0: 'teal.900',
            10: 'teal.800',
            20: 'teal.700',
            30: 'teal.600',
            40: 'teal.500',
            60: 'teal.400',
            80: 'teal.300'
        },
        lightModeColors: {
            0: 'teal.50',
            10: 'teal.100',
            20: 'teal.200',
            30: 'teal.300',
            50: 'teal.400',
            80: 'teal.500'
        }
    }
}
