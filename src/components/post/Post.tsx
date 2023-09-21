import Stack from 'react-bootstrap/Stack';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import {PostDef} from '../../features/posts/PostTypes'
import styles from './postStyle.module.css'
import TimeAgo from '../timeago/TimeAgo';


export default function Post(post:PostDef) {
  return (
    <Stack direction="horizontal" gap={3} className={styles.Post}>
      <Image src={post.author.avatar_url + '&s=48'}
             alt={post.author.username} roundedCircle />
      <div>
        <p>
          <Link to={'/user/' + post.author.username}>
            {post.author.username}
          </Link>
          &nbsp;&mdash;&nbsp;
          <TimeAgo isoDate={post.timestamp} />:
        </p>
        <p>{post.text}</p>
      </div>
    </Stack>
  );
}