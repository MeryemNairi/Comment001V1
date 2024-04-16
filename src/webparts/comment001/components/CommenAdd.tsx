import * as React from 'react';
import styles from './Comment001.module.scss';

interface ICommentAddProps {
  onAddComment: () => void;
  userDisplayName: string; 
}

export const CommentAdd: React.FunctionComponent<ICommentAddProps> = ({ onAddComment, userDisplayName }) => {
  const [newDescription, setNewDescription] = React.useState<string>('');

  const handleAddComment = async () => {
    try {
      const currentDate = new Date();
      const currentTime = currentDate.toLocaleString();

      const response = await fetch(`https://cnexia.sharepoint.com/sites/Cnexia4everyone/_api/web/lists/getByTitle('Comment001V1')/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          description: newDescription,
          date: currentTime, // Ajouter l'heure et la date au commentaire
          userDisplayName: userDisplayName // Utilisation de userDisplayName provenant des props
        })
      });

      if (!response.ok) {
        throw new Error('Failed to add comment');
      }

      onAddComment();

      // Effacer le champ de saisie après l'ajout
      setNewDescription('');
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };

  return (
    <div className={styles.commentAdd}>
      <h2>Add Comment</h2>
      <input
        type="text"
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
        placeholder="Enter your comment..."
        className={styles.commentInput} 
      />
      <button onClick={handleAddComment} className={styles.commentButton}>Add Comment</button> 
    </div>
  );
};
