using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProductsController : ControllerBase
{
    private readonly StoreContext dbContext;

    public ProductsController(StoreContext context)
    {
        this.dbContext = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<Product>>> GetProducts()
    {
        return await dbContext.Products.ToListAsync();
    }

    [HttpGet("{id}")] // api/products/3
    public async Task<ActionResult<Product>> GetProduct(int id)
    {
        return await dbContext.Products.FindAsync(id);
    }
}
