import FilialTable from '@/components/common/filial/filial-table'
import GroupTable from '@/components/common/group/group-table'
import RoomTable from '@/components/common/room/room-table'
import SubjectTable from '@/components/common/subjects/subject-table'
import TimeTable from '@/components/common/time/time-table'

export default function Tables() {
  return (
    <div className='flex flex-col gap-8'>
        <FilialTable />
        <SubjectTable />
        <RoomTable />
        <GroupTable />
        <TimeTable />
    </div>
  )
}
