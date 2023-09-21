import Button from 'react-bootstrap/Button';
import { Pagin } from '../../features/posts/PostTypes';
import styles from './moreStyle.module.css'

interface MoreProps{
    pagination:Pagin
    loadNextPage:any
}

export default function More({ pagination, loadNextPage }:MoreProps) {
  let thereAreMore = false;
  if (pagination) {
    const { offset, count, total } = pagination;
    thereAreMore = offset + count < total;
  }

  return (
    <div className={styles.More}>
      {thereAreMore &&
        <Button variant="outline-primary" onClick={loadNextPage}>
          More &raquo;
        </Button>
      }
    </div>
  );
}