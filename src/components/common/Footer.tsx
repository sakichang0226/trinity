import {
    SfIconTwitter,
    SfButton,
    SfLink,
    SfListItem,
  } from '@storefront-ui/react';
  
const Footer = () => {

    const categories = [
        {
          label: 'About',
          subcategories: [
            {
              subcategoryLabel: 'Who we are',
              link: '#',
            },
          ],
        },
      ];
    const socialMedia = [
        {
          label: 'Twitter',
          link: '#',
          icon: () => <SfIconTwitter />,
        }
    ];

    return (
      <footer className="w-full mt-auto">
        <div className="flex justify-evenly p-5 bg-neutral-900 mx-auto">
          <div>
            {categories.map(({ label, subcategories }) => (
                <ul className="text-white grid grid-cols xs:pb-4" key={label}>
                    <li className="ml-4 text-lg font-medium leading-7 font-body">{label}</li>
                    {subcategories?.map(({ subcategoryLabel, link }) => (
                        <SfListItem className="py-2 !bg-transparent typography-text-sm font-body" key={subcategoryLabel}>
                        <SfLink
                            className="no-underline text-white hover:underline hover:text-white hover:!bg-neutral-500 active:bg-transparent"
                            variant="secondary"
                            href={link}
                        >
                            {subcategoryLabel}
                        </SfLink>
                        </SfListItem>
                    ))}
                </ul>
            ))}
          </div>
          <div>
            <h2 className='text-white grid grid-cols xs:pb-4'>SOCIEL</h2>
            <div>
              {socialMedia.map(({ icon: Icon, label, link }) => (
                <SfButton
                  key={label}
                  square
                  as="a"
                  variant="tertiary"
                  className="text-white active:text-white hover:text-white hover:!bg-neutral-500 active:bg-transparent"
                  href={link}
                  aria-label={`Go to ${label} page`}
                >
                  <Icon />
                </SfButton>
              ))}
            </div>
          </div>
        </div>
      </footer>
    );
}
export default Footer;
