import React, { useState } from 'react'
import { Send, Heart, Edit, Trash2 } from 'lucide-react'

const CommentSection = ({ comments = [], onAddComment, onUpdateComment, onDeleteComment, currentUser }) => {
  const [newComment, setNewComment] = useState('')
  const [editId, setEditId] = useState(null)
  const [editContent, setEditContent] = useState('')

  const handleSubmit = () => {
    if (newComment.trim()) {
      onAddComment(newComment)
      setNewComment('')
    }
  }

  const userAvatar = currentUser
    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.username)}&background=random`
    : 'https://ui-avatars.com/api/?name=Guest&background=random'

  const userName = currentUser?.username || '게스트'

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        댓글 {comments.length}개
      </h3>

      {/* 댓글 입력 */}
      <div className="flex gap-3 mb-6">
        <img src={userAvatar} alt={userName} className="h-10 w-10 rounded-full" />

        <div className="flex-1">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 입력하세요..."
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows="3"
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={handleSubmit}
              disabled={!newComment.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              댓글 작성
            </button>
          </div>
        </div>
      </div>

      {/* 댓글 목록 */}
      <div className="space-y-4">
        {comments.map((comment) => {
          const isWriter = currentUser?.id === comment.profileId

          return (
            <div key={comment.id} className="flex gap-3 p-4 hover:bg-gray-50 rounded-lg transition">
              <img
                src={comment.avatar ? comment.avatar : `https://ui-avatars.com/api/?name=${currentUser.username}&background=random`}
                alt={comment.author}
                className="h-10 w-10 rounded-full"
              />

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-gray-900">{comment.author}</span>
                  <span className="text-sm text-gray-500">{comment.timestamp}</span>
                </div>

                {/* 수정 모드 */}
                {editId === comment.id ? (
                  <div className="space-y-2">
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2"
                      rows={2}
                    />

                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => {
                          onUpdateComment(comment.id, editContent)
                          setEditId(null)
                        }}
                        className="px-3 py-1 bg-blue-600 text-white rounded-lg"
                      >
                        저장
                      </button>
                      <button
                        onClick={() => setEditId(null)}
                        className="px-3 py-1 bg-gray-300 rounded-lg"
                      >
                        취소
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-gray-700 mb-2">{comment.content}</p>

                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500 transition">
                        <Heart className="h-4 w-4" />
                        <span>{comment.likes}</span>
                      </button>

                      {isWriter && (
                        <>
                          <button
                            onClick={() => {
                              setEditId(comment.id)
                              setEditContent(comment.content)
                            }}
                            className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-500"
                          >
                            <Edit className="h-4 w-4" />
                            수정
                          </button>

                          <button
                            onClick={() => onDeleteComment(comment.id)}
                            className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                            삭제
                          </button>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CommentSection