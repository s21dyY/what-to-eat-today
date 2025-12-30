import {deletePantryItem} from '@/app/auth/actions'

export default function PantryCheckBox({item}: {item: {id: number; name: string}}) {
  return (
    <form action={async (formData: FormData) => {
      await deletePantryItem(item.id)
    }}>
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          name="completed"
          className="w-5 h-5 text-orange-500 bg-gray-100 border-gray-300 rounded focus:ring-orange-400 cursor-pointer"
          onChange={async () => {
            await deletePantryItem(item.id)
          }}
        />
        <span className="text-gray-700 font-medium">{item.name}</span>
      </label>
    </form>
  )
}