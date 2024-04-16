import * as React from 'react';
import { IComment001Props } from './IComment001Props';

interface IComment {
  Id: number;
  description: string;
}

export const Comment001: React.FunctionComponent<IComment001Props> = (props) => {
  const [comments, setComments] = React.useState<IComment[]>([]);

  React.useEffect(() => {
    loadComments();
  }, []);

  const loadComments = async () => {
    try {
      // Simulated API call, replace with your actual API call
      const response = await fetch(`https://cnexia.sharepoint.com/sites/Cnexia4everyone/_api/web/lists/getByTitle('Comment001V1')/items?$select=Id,description`, {
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
        description: item.description
      }));
      setComments(loadedComments);
    } catch (error) {
      console.error("Error loading comments: ", error);
    }
  };

  

  return (
    <section>
      <div>
        <h2>Comment List</h2>
        
        <ul>
          {comments.map(comment => (
            <li key={comment.Id}>
              <strong>{props.userDisplayName}:</strong> {comment.description}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
