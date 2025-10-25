import React, { useState } from 'react'
import { Send, Heart } from 'lucide-react'

const CommentSection = ({ comments, onAddComment }) => {
  const [newComment, setNewComment] = useState('')

  const handleSubmit = () => {
    if (newComment.trim()) {
      onAddComment(newComment)
      setNewComment('')
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        댓글 {comments.length}개
      </h3>

      {/* Comment Input */}
      <div className="flex gap-3 mb-6">
        <img
          src="https://ui-avatars.com/api/?name=현재사용자&background=random"
          alt="현재사용자"
          className="h-10 w-10 rounded-full"
        />
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
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              댓글 작성
            </button>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-3 p-4 hover:bg-gray-50 rounded-lg transition">
            <img
              src={comment.avatar}
              alt={comment.author}
              className="h-10 w-10 rounded-full"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-gray-900">{comment.author}</span>
                <span className="text-sm text-gray-500">{comment.timestamp}</span>
              </div>
              <p className="text-gray-700 mb-2">{comment.content}</p>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500 transition">
                  <Heart className="h-4 w-4" />
                  <span>{comment.likes}</span>
                </button>
                <button className="text-sm text-gray-500 hover:text-blue-500 transition">
                  답글
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CommentSection