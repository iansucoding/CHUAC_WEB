import renderClassroom from './renderClassroom';

const A1F = {
    'A101(敦煌書局)': {
        left:'6%',
        top:'84%',
        renderContent: d => renderClassroom(d)
    },
    'A102': {
        left:'23%',
        top:'23%',
        renderContent: d => renderClassroom(d)
    },
    'A103階梯教室(一)': {
        left:'80%',
        top:'84%',
        renderContent: d => renderClassroom(d)
    },
}

export default A1F;