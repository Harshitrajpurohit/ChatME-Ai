// app/page.jsx
import ChatHistory from '@/components/ChatHistory';
import ChatMessage from '@/components/ChatMessage';

export default function Page() {
  return (
    <div className="p-3 min-h-[calc(100vh)] bg-[#10151f]">
      <div className="flex flex-row justify-center items-center h-full">
        {/* <ChatHistory /> */}
        <ChatMessage />
      </div>
    </div>
  );
}