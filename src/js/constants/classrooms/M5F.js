import renderClassroom from './renderClassroom';

const M5F = {
    'M501': {
        left:'12%',
        top:'84%',
        renderContent: d => renderClassroom(d)
    },
    'M502': {
        left:'12%',
        top:'65%',
        renderContent: d => renderClassroom(d)
    },
    'M503': {
        left:'21%',
        top:'84%',
        renderContent: d => renderClassroom(d)
    },
    'M504': {
        left:'21%',
        top:'65%',
        renderContent: d => renderClassroom(d)
    },
    'M505/M507/M509/M511': {
        left:'29%',
        top:'84%',
        renderContent: d => renderClassroom(d)
    },
    'M506/M508/M510/M512': {
        left:'29%',
        top:'65%',
        renderContent: d => renderClassroom(d)
    },
    'M513': {
        left:'48%',
        top:'84%',
        renderContent: d => renderClassroom(d)
    },
    'M514/M516/M518/M520': {
        left:'43%',
        top:'68%',
        renderContent: d => renderClassroom(d)
    },
    'M515/M515A': {
        left:'56%',
        top:'84%',
        renderContent: d => renderClassroom(d)
    },
    'M517': {
        left:'75%',
        top:'83%',
        renderContent: d => renderClassroom(d)
    },
    'M519': {
        left:'83%',
        top:'83%',
        renderContent: d => renderClassroom(d)
    },
    'M521': {
        left:'89%',
        top:'83%',
        renderContent: d => renderClassroom(d)
    },
    'M522/M524/M526/M528': {
        left:'54%',
        top:'65%',

        renderContent: d => renderClassroom(d)
    },
    'M525': {
        left:'71%',
        top:'58%',
        renderContent: d => renderClassroom(d)
    },
    'M527': {
        left:'71%',
        top:'47%',
        renderContent: d => renderClassroom(d)
    },
    'M530/M532/M530A': {

        left:'74%',
        top:'65%',
        renderContent: d => renderClassroom(d)
    },
}

export default M5F;