import * as React from 'react';
import { IComment001Props } from './IComment001Props';
import styles from './Comment001.module.scss';

interface IComment {
  Id: number;
  description: string;
  date: string; 
  userDisplayName: string;
}

export const Comment001: React.FunctionComponent<IComment001Props> = (props) => {
  const [comments, setComments] = React.useState<IComment[]>([]);

  React.useEffect(() => {
    loadComments();
  }, []);

  const loadComments = async () => {
    try {
      
      const response = await fetch(`https://cnexia.sharepoint.com/sites/Cnexia4everyone/_api/web/lists/getByTitle('Comment001V1')/items?$select=Id,description,date,userDisplayName`, {
        method: 'GET',
        headers: {        
          'Accept': 'application/json;odata=nometadata'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      const data = await response.json();
      const loadedComments: IComment[] = data.value.map((item: any) => ({
        Id: item.Id,
        description: item.description,
        date: item.date,
        userDisplayName: item.userDisplayName
      }));
      setComments(loadedComments);
    } catch (error) {
      console.error("Error loading comments: ", error);
    }
  };

  return (
    <section className={styles.commentContainer}>
      {comments.map(comment => (
        <div key={comment.Id} className={styles.commentItem}>
          <div className={styles.commentTop}>
            <div className={styles.profileImage}>
            </div>
            <div className={styles.commentDetails}>
              <div className={styles.commentTitle}>
                <h5>{comment.userDisplayName}</h5>
                <span className={styles.commentDate}>{comment.date}</span> 
              </div>
            </div>
          </div>
          <div className={styles.commentText}>
            <p>{comment.description}</p>
          </div>
          <div className={styles.replySection}>
          </div>
        </div>
      ))}
    </section>
  );
};
