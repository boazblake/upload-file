import m from 'mithril'
import SlideSelectField from '../../components/cards/SlideSelectField.jsx'

const Slide = {
    view: ({ attrs }) =>
        <div class="thumb-card card" key={attrs.key}>
            <div class="slide-fields">
                <SlideSelectField fieldValue={attrs.title} />
                <SlideSelectField
                    action={() =>
                        attrs.actions.toggleSelection(attrs.slide)
                    }
                    fieldColor={{
                        color: attrs.slide.isSelected ? "yellow" : "green"
                    }}
                    fieldValue={<i class="fa fa-star" />}
                />
                <SlideSelectField
                    action={() => attrs.actions.editCard(attrs.slide.id)}
                    fieldValue={<i class="fas fa-pen-alt" />}
                />
            </div>
        </div>
}


export default Slide