// Quick script to add long test messages to Supabase
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

const longMessage1 = `안녕하세요! 이것은 캐러셀 기능을 테스트하기 위한 매우 긴 메시지입니다.

롤링페이퍼는 친구들과 소중한 추억을 나누는 특별한 공간입니다. 생일, 졸업, 승진 등 인생의 중요한 순간들을 축하하거나, 그냥 평범한 날에도 따뜻한 마음을 전할 수 있는 곳이죠.

이 메시지는 여러 단락으로 구성되어 있으며, 캐러셀이 긴 텍스트를 어떻게 처리하는지 확인하기 위한 것입니다. 메시지가 길어도 읽기 편하게 표시되는지, 스크롤이 제대로 작동하는지 테스트합니다.

또한 여러 메시지 사이를 넘나들 때 캐러셀 애니메이션이 부드럽게 작동하는지도 확인할 예정입니다. 좌우 화살표 버튼을 클릭하거나 스와이프 제스처를 사용할 때 자연스러운 전환이 이루어져야 합니다.

페이지 인디케이터(점들)도 현재 어떤 메시지를 보고 있는지 명확하게 표시해야 하며, 클릭하면 해당 메시지로 바로 이동할 수 있어야 합니다.

이렇게 긴 메시지를 통해 실제 사용 환경을 시뮬레이션하고, 사용자 경험을 개선할 수 있습니다. 실제로 사용자들은 진심 어린 긴 메시지를 작성할 수 있으므로, 이런 경우에도 UI가 잘 작동해야 합니다.

메시지 카드의 높이는 60vh로 설정되어 있어 충분한 공간을 제공하며, 내용이 넘칠 경우 스크롤이 가능하도록 구현되어 있습니다.

캐러셀 컴포넌트는 embla-carousel-react 라이브러리를 사용하여 구현되었으며, 터치 제스처와 마우스 드래그를 모두 지원합니다.

이는 모바일과 데스크톱 환경 모두에서 훌륭한 사용자 경험을 제공할 수 있도록 합니다.`

const longMessage2 = `두 번째 메시지입니다! 이 메시지도 상당히 긴 내용을 담고 있습니다.

캐러셀 기능의 핵심은 여러 메시지를 효율적으로 탐색할 수 있게 하는 것입니다. 기존의 스크롤 방식과 달리, 한 번에 하나의 메시지에 집중할 수 있어 가독성이 훨씬 좋습니다.

특히 모바일 환경에서는 화면 크기가 제한적이기 때문에, 캐러셀 방식이 더욱 효과적입니다. 사용자는 좌우로 스와이프하여 자연스럽게 다음 메시지로 넘어갈 수 있습니다.

네비게이션 버튼은 메시지가 2개 이상일 때만 표시되며, 첫 번째 메시지에서는 왼쪽 화살표가, 마지막 메시지에서는 오른쪽 화살표가 비활성화됩니다.

이런 세심한 UX 디자인은 사용자가 현재 위치를 쉽게 파악하고, 더 이상 넘길 메시지가 없다는 것을 직관적으로 알 수 있게 합니다.

페이지 카운터(1 / 3 형식)도 하단에 표시되어 전체 메시지 수와 현재 위치를 명확하게 보여줍니다.

각 메시지 카드는 작성자 이름, 작성 날짜, 그리고 메시지 내용을 포함하고 있으며, 깔끔한 레이아웃으로 정보를 구조화합니다.

카드 상단에는 작성자 정보가, 하단에는 스크롤 가능한 메시지 내용이 배치되어 있어 정보 위계가 명확합니다.

이러한 디자인은 사용자가 메시지를 읽는 데 집중할 수 있도록 도와줍니다.`

const longMessage3 = `세 번째 메시지는 더욱 긴 내용으로 구성되어 있습니다.

롤링페이퍼 애플리케이션의 목표는 단순히 메시지를 저장하는 것을 넘어, 감동적인 경험을 제공하는 것입니다.

친구들의 진심 어린 메시지를 하나하나 읽어나가는 과정은 특별한 추억이 됩니다. 캐러셀 UI는 이러한 경험을 더욱 의미 있게 만들어줍니다.

각 메시지를 넘길 때마다 새로운 감동이 펼쳐지는 것처럼, 부드러운 애니메이션과 함께 전환됩니다.

이는 마치 실제 롤링페이퍼 책장을 넘기는 것과 같은 느낌을 줍니다.

기술적으로는 React의 useState와 useEffect 훅을 사용하여 현재 인덱스를 관리하고, embla API의 이벤트 리스너를 통해 캐러셀의 상태 변화를 감지합니다.

이를 통해 페이지 인디케이터와 네비게이션 버튼의 상태를 실시간으로 업데이트할 수 있습니다.

성능 최적화를 위해 useEffect의 의존성 배열을 적절히 설정하여 불필요한 리렌더링을 방지했습니다.

또한 embla 인스턴스가 생성되기 전에 이벤트 리스너를 등록하려고 시도하는 것을 방지하기 위해 조건부 체크를 추가했습니다.

메시지 로딩은 Supabase에서 비동기적으로 수행되며, 로딩 상태를 표시하여 사용자에게 피드백을 제공합니다.

에러 처리도 적절히 구현되어 있어, 네트워크 문제나 데이터베이스 오류가 발생해도 애플리케이션이 안정적으로 작동합니다.

이 모든 것들이 합쳐져 사용자에게 매끄럽고 즐거운 경험을 제공합니다.`

async function addTestMessages() {
    // Find the "긴 메시지 테스트" cabinet
    const { data: cabinets } = await supabase
        .from('cabinets')
        .select('*')
        .eq('owner_name', '긴 메시지 테스트')
        .limit(1)

    if (!cabinets || cabinets.length === 0) {
        console.log('Cabinet not found. Please create it first.')
        return
    }

    const cabinetId = cabinets[0].id

    // Add three long messages
    const messages = [
        { cabinet_id: cabinetId, author: '테스터1', message: longMessage1 },
        { cabinet_id: cabinetId, author: '테스터2', message: longMessage2 },
        { cabinet_id: cabinetId, author: '테스터3', message: longMessage3 },
    ]

    for (const msg of messages) {
        const { error } = await supabase.from('Rolling_Paper').insert([msg])
        if (error) {
            console.error('Error adding message:', error)
        } else {
            console.log(`Added message from ${msg.author}`)
        }
    }

    console.log('All test messages added successfully!')
}

addTestMessages()
