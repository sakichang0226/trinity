import { SfButton,SfIconShoppingCart,SfIconFavorite, SfIconPerson } from "@storefront-ui/react"

const NavigationBar = () => {
    
    const actionItems = [
        {
            label: 'Log in',
            icon: <SfIconPerson />,
            ariaLabel: 'Log in',
            role: 'login',
        },
        {
            icon: <SfIconFavorite />,
            label: '',
            ariaLabel: 'Wishlist',
            role: 'button',
        },
        {
          icon: <SfIconShoppingCart />,
          label: '',
          ariaLabel: 'Cart',
          role: 'button',
        }
      ];
    
    return (
        <nav className="flex-1 hidden md:flex justify-end lg:order-last lg:ml-4">
            <div className="flex flex-row flex-nowrap">
                {actionItems.map((actionItem) => (
                    <SfButton
                        key={actionItem.ariaLabel}
                        className="mr-2 -ml-0.5 rounded-md text-primary-700 hover:bg-primary-100 active:bg-primary-200 hover:text-primary-600 active:text-primary-700"
                        aria-label={actionItem.ariaLabel}
                        variant="tertiary"
                        square
                        slotPrefix={actionItem.icon}
                    >
                    </SfButton>
                ))}
            </div>
        </nav>
    )
}
export default NavigationBar;
