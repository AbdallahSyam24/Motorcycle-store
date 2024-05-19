// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('MotorcycleDB');

// Create a new document in the collection.
db.getCollection('manufacturers').insertMany(
    [
        { 'name': 'BMW', 'country': 'Germany', 'year': 1923, 'logo': "" },
        { 'name': 'Ducati', 'country': 'Italy', 'year': 1926, 'logo': "" },
        { 'name': 'Harley-Davidson', 'country': 'USA', 'year': 1903, 'logo': "" },
        { 'name': 'Indian', 'country': 'USA', 'year': 1901, 'logo': "" },
        { 'name': 'KTM', 'country': 'Austria', 'year': 1934, 'logo': "" },
        { 'name': 'Suzuki', 'country': 'Jaban', 'year': 1937, 'logo': "" },
        { 'name': 'Yamaha', 'country': 'Jaban', 'year': 1955, 'logo': "" }
    ]
);
