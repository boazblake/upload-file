import m from 'mithril'
import SlideSelectField from './SlideSelectField.jsx'


const Slide = {
    oncreate: ({ dom }) =>
        dom.classList.add('fancyIn'),
    onbeforeremove: ({ dom }) =>
        dom.classList.add('fancyOut'),
    view: ({ attrs }) =>
        < article class="media box" key={attrs.key} onmouseover={() => attrs.model.contents(attrs.slide.contents)}>
            <div class="media-content">
                <SlideSelectField fieldValue={attrs.title} class="title is-6" />
            </div>
            <div class="media-right">
                <SlideSelectField class="button"
                    action={() =>
                        attrs.actions.toggleSelection(attrs.slide)
                    }
                    fieldColor={{
                        color: attrs.slide.isSelected ? "yellow" : "green"
                    }}
                    fieldValue={<i class="fa fa-star" />}
                />
                <SlideSelectField class="button"
                    action={() => attrs.actions.editCard(attrs.editDto)}
                    fieldValue={<i class="fas fa-pen-alt" />}
                />
            </div>
        </article >
}


export default Slide