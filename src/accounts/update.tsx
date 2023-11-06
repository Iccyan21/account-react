import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// ユーザー情報を表すインターフェイスを定義
interface User {
  user_id: string;
  nickname: string;
  comment: string;
}

interface UserUpdateData {
  nickname?: string;
  comment?: string;
}

const UserUpdate = () => {
  const { user_id } = useParams();
  const [user, setUser] = useState<User | null>(null); 
  const [nickname, setNickname] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState<string | null>(null);

  // ユーザー情報をフェッチする関数
  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/accounts/users/${user_id}/`);
      setUser(response.data.user);
    } catch (err) {
      // ここでエラーの型チェックを行います
      if (axios.isAxiosError(err)) {
        const errorMsg = err.response?.data?.message || 'ユーザー情報の取得に失敗しました。';
        setError(errorMsg);
      } else {
        setError('An unexpected error occurred.');
      }
      console.error('エラー発生', err);
    }
  };

  useEffect(() => {
    if (user_id) fetchUser(); // コンポーネントのマウント時にユーザー情報をフェッチ
  }, [user_id]);

  const handleUpdate = async () => {
    setError(null); // エラーをリセット

    const updateData: UserUpdateData = {
      nickname: nickname,
      comment: comment,
    };

    try {
      const response = await axios.patch(`http://localhost:8000/accounts/users/${user_id}/update/`, updateData);
      alert('ユーザー情報が更新されました。');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message || '更新中にエラーが発生しました。');
      } else {
        setError('予期しないエラーが発生しました。');
      }
    }
  };

  return (
    <div>
      {user ? ( // user情報があるか確認します。
        <>
          <p>ユーザーID: {user.user_id}</p> {/* ここでuserのuser_idを表示 */}
          <p>ニックネーム: {user.nickname}</p> {/* ここでuserのnicknameを表示 */}
          <p>コメント: {user.comment}</p> {/* ここでuserのcommentを表示 */}
        </>
      ) : (
        <p>ユーザー情報を読み込んでいます...</p>
      )}

      <input
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder="ニックネーム"
      />
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="コメント"
      />
      {error && <p className="error">{error}</p>}
      <button onClick={handleUpdate}>更新</button>
    </div>
  );
};

export default UserUpdate;
