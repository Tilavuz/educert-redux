import FilialTable from '@/components/common/filial/filial-table'
import RoomTable from '@/components/common/room/room-table'
import SubjectTable from '@/components/common/subjects/subject-table'

export default function Tables() {
  return (
    <div className='flex flex-col gap-8'>
        <FilialTable />
        <SubjectTable />
        <RoomTable />
    </div>
  )
}
