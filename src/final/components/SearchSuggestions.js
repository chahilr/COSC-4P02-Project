import { Link } from 'react-router-dom';
import { getDescrption } from '../../utils/firestoreFunctions';
import styles from '../styles/SearchSuggestions.module.css';

export default function SearchSuggestions({ results }) {
  return (
    <div className={styles['search-list-container']}>
      <ul className={styles['search-list']}>
        {results.map((result) => (
          <Link
            key={result[0]}
            to="/artifact"
            style={{ textDecoration: 'none' }}
            state={{
              id: result[0],
              title: result[1].Name,
              year: result[1].Year,
              exhibit: result[1].Exhibition,
              image: result[1].Photos[0],
              tags: result[1].Tags,
            }}
          >
            <li className={styles['search-list-item']}>{result[1].Name}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
