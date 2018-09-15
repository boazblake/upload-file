import m from 'mithril'
import SlideSelectField from './SlideSelectField.jsx'

const Slide = {
    oncreate: ({ dom }) =>
        dom.classList.add('fancy'),
    view: ({ attrs }) => {
        console.log(attrs)
        return < div class="thumb-card card" key={attrs.key} >
            <div class="level">
                <div class="level-left">
                    <SlideSelectField fieldValue={attrs.title} class="slide-field title" />
                </div>
                <div class="level-right">
                    <SlideSelectField class="slide-field level-right"
                        action={() =>
                            attrs.actions.toggleSelection(attrs.slide)
                        }
                        fieldColor={{
                            color: attrs.slide.isSelected ? "yellow" : "green"
                        }}
                        fieldValue={<i class="fa fa-star" />}
                    />
                    <SlideSelectField class="slide-field button"
                        action={() => attrs.actions.editCard(attrs.editDto)}
                        fieldValue={<i class="fas fa-pen-alt" />}
                    />
                </div>
            </div>
        </div >
    }
}


export default Slide