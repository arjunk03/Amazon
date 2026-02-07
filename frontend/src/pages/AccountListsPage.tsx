import { Link } from 'react-router-dom';
import { mockLists } from '../mock/data';

/**
 * GET /api/user/lists
 */
export function AccountListsPage() {
  const lists = mockLists;

  return (
    <div className="max-w-[900px] mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Your Lists</h1>
      {lists.length === 0 ? (
        <p className="text-gray-500">No lists yet.</p>
      ) : (
        <ul className="space-y-4">
          {lists.map((list) => (
            <li key={list.id} className="border rounded p-4 flex items-center justify-between">
              <div>
                <Link to={`/account/lists/${list.id}`} className="font-medium hover:text-amazon-orange">{list.name}</Link>
                <p className="text-sm text-gray-500">{list.itemCount} item(s)</p>
              </div>
              <Link to={`/account/lists/${list.id}`} className="text-amazon-orange hover:underline text-sm">View</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
